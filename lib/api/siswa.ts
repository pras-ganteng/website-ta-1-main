import { getSession } from '@/lib/auth/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://absensholat-api-mochraiyan9864-95nj69sm.leapcell.dev/api';

export interface Siswa {
  nis: string;
  nama_siswa: string;
  jk: string;
  jurusan?: string;
  kelas?: string;
}

export interface SiswaListResponse {
  data: Siswa[];
  pagination?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  message: string;
}

export interface SiswaResponse {
  data: Siswa;
  message: string;
}

export interface ErrorResponse {
  message: string;
  error?: string;
}

/**
 * Get all siswa with optional filters and pagination
 */
export const getAllSiswa = async (
  page: number = 1,
  pageSize: number = 20,
  search?: string,
  kelas?: string,
  jurusan?: string
): Promise<SiswaListResponse> => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('page_size', pageSize.toString());
    if (search) params.append('search', search);
    if (kelas) params.append('kelas', kelas);
    if (jurusan) params.append('jurusan', jurusan);

    const response = await fetch(`${API_BASE_URL}/siswa?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to fetch siswa');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching siswa');
  }
};

/**
 * Get a single siswa by NIS
 */
export const getSiswaByNis = async (nis: string): Promise<SiswaResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/siswa/${nis}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to fetch siswa');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching siswa');
  }
};

/**
 * Create a new siswa
 */
export const createSiswa = async (siswaData: Siswa): Promise<SiswaResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/siswa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(siswaData),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to create siswa');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while creating siswa');
  }
};

/**
 * Update an existing siswa (requires authentication token)
 */
export const updateSiswa = async (nis: string, siswaData: Siswa): Promise<SiswaResponse> => {
  try {
    const session = getSession();
    if (!session) {
      throw new Error('You must be logged in to update siswa');
    }

    const response = await fetch(`${API_BASE_URL}/siswa/${nis}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token || ''}`,
      },
      body: JSON.stringify(siswaData),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to update siswa');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while updating siswa');
  }
};

/**
 * Delete a siswa (requires authentication token)
 */
export const deleteSiswa = async (nis: string): Promise<{ message: string }> => {
  try {
    const session = getSession();
    if (!session) {
      throw new Error('You must be logged in to delete siswa');
    }

    const response = await fetch(`${API_BASE_URL}/siswa/${nis}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token || ''}`,
      },
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.message || 'Failed to delete siswa');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while deleting siswa');
  }
};
