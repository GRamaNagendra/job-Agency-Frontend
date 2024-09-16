import { useState, useEffect } from 'react';

const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return role;
};

export default useUserRole;
