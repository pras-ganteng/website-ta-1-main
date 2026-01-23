// Request types
export interface RegisterRequest {
  nis: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

// Response types
export interface LoginResponse {
  nis?: string;
  nama_siswa?: string;
  jk?: string;
  jurusan?: string;
  kelas?: string;
  email: string;
  is_google_acct: boolean;
  role?: string;
  token?: string;
  id_staff?: number;
  nip?: string;
  name?: string;
  username?: string;
}

export interface RegisterResponse {
  message: string;
  nis: string;
  email: string;
  created_at: string;
  is_google_acct: boolean;
}

export interface LoginResponseData {
  message: string;
  data: LoginResponse;
}

export interface ErrorResponse {
  message: string;
  error?: string;
}
