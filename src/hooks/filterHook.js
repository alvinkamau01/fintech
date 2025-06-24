import {useState, useCallback} from 'react';
import supabase from '../supabase';

const useFilter = (tableName, defaultOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const filterData = useCallback(
    async (payload, options = {}) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setData(null);

        console.log(`Attempting to filter data from table: ${tableName}`);
        console.log('Payload:', payload);

        let query = supabase.from(tableName).select();

        // Apply filters using match for exact matches
        if (payload && Object.keys(payload).length > 0) {
          query = query.match(payload);
        }

        const { data: result, error: supabaseError } = await query;

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          throw new Error(supabaseError.message || `Error filtering from ${tableName}`);
        }

        if (!result || result.length === 0) {
          throw new Error(`No data returned from ${tableName} filter`);
        }

        console.log(`Successfully filtered from ${tableName}:`, result);

        setData(result);
        setSuccess(true);
        return result;
      } catch (err) {
        console.error(`Error filtering data from ${tableName}:`, err);
        const errorMessage = err.message || `Failed to filter data from ${tableName}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [tableName]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setData(null);
  }, []);

  return {
    filterData,
    loading,
    error,
    success,
    data,
    reset,
  };
};

export default useFilter;
