import { useState, useCallback } from "react";
import supabase from "../supabase";

const useFetch = (tableName, defaultOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (payload, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setData(null);

      console.log(`Attempting to fetch data from table: ${tableName}`);
      console.log('Payload:', payload);

      const { data: result, error: supabaseError } = await supabase
        .from(tableName)
        .select();


      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message || `Error fetching from ${tableName}`);
      }

      if (!result || result.length === 0) {
        throw new Error(`No data returned from ${tableName} fetch`);
      }

      console.log(`Successfully fetched from ${tableName}:`, result);

      setData(result);
      setSuccess(true);
      return result;
    } catch (err) {
      console.error(`Error fetching data from ${tableName}:`, err);
      const errorMessage = err.message || `Failed to fetch data from ${tableName}`;
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
    fetchData,
    loading,
    error,
    success,
    data,
    reset
  };
};

export default useFetch;
