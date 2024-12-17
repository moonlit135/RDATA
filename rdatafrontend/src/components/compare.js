try {
    const response = await axios.post('http://localhost:5000/api/Stlogin/login', { email, password });
         
    if (response.data.message === "Login successful") {
      // If login is successful, navigate to the student dashboard
      console.log(response.data);
      
      // Store the token directly from the response data
      localStorage.setItem("token", response.data.token);
  
      // Now, navigate to the student dashboard
      navigate("/studentdashboard");
    } else {
      // If login fails, display the error message from the server
      setError(response.data.message);
    }
  } catch (err) {
    // Handle any network or server errors
    setError('Login failed. Please try again.');
  }
  