// Respuesta de GET /auth/me (solo los campos que mostramos)
export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  image: string;
  birthDate: string;
  university: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
}