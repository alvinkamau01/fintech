import supabase from './supabase';

export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) console.error('Sign-up error:', error.message);
  else console.log('User signed up:', user);
}

export async function signIn(email, password) {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) console.error('Login error:', error.message);
  else console.log('User signed in:', user);
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) console.error('Logout error:', error.message);
  else console.log('User signed out');
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    
  });

  if (error) console.error('Google Login Error:', error.message);
  else console.log('User signed in:', data);
}