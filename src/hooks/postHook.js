import { useState, useCallback } from 'react';
import supabase from '../supabase';

const usePost = (tableName, defaultOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const postData = useCallback(async (payload, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setData(null);

      console.log(`Attempting to insert into table: ${tableName}`);
      console.log('Payload:', payload);

      // Insert data into the specified Supabase table
      const { data: result, error: supabaseError } = await supabase
        .from(tableName)
        .insert(payload)
        .select();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message || `Error inserting into ${tableName}`);
      }

      if (!result || result.length === 0) {
        throw new Error(`No data returned from ${tableName} insert`);
      }

      const insertedRecord = result[0];
      console.log(`Successfully inserted into ${tableName}:`, insertedRecord);

      setData(insertedRecord);
      setSuccess(true);
      return insertedRecord;
    } catch (err) {
      console.error(`Error in postData for ${tableName}:`, err);
      const errorMessage = err.message || `Failed to insert data into ${tableName}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setData(null);
  }, []);

  return {
    postData,
    loading,
    error,
    success,
    data,
    reset
  };
};

export default usePost;
