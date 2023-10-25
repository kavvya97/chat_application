export const isAuthenticated = (): boolean => {
    return localStorage.getItem('userToken') !== null;
}
export async function signUpHandler(username: string, email: string, password: string) {

    const data = {
      username: username,
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message.');
      }
  
      return await response.json();
    } catch (error) {
      console.log('Error occured when creating user');
      throw error;
    }
  }
  
  export async function loginHandler(username: string, password: string) {
    const data = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error();
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }