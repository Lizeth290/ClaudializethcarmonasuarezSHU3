import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  Outlet,
} from 'react-router-dom';
import axios from 'axios';

// --- 1. CONTEXTO DE AUTENTICACIÓN ---
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post('/api/users/login', { username, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data);
    return res.data;
  };

  const register = async (username, password) => {
    const res = await axios.post('/api/users/register', { username, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- 2. COMPONENTES ---
function Layout() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">App SHU3</span>
              {isAuthenticated && (
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard (CRUD)
                    </Link>
                    <Link
                      to="/external-api"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      API Externa
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {isAuthenticated && (
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <span className="text-gray-300 mr-4">
                    Hola, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// --- 3. PÁGINAS ---
function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span>{error}</span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? 'Cargando...' : (isLogin ? 'Entrar' : 'Crear Cuenta')}
          </button>
        </form>
        <p className="text-center text-sm">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const { token } = useAuth();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('/api/items', config);
      setItems(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post(
        '/api/items',
        { name: newItemName, description: newItemDesc },
        config
      );
      setItems([...items, res.data]);
      setNewItemName('');
      setNewItemDesc('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear item');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`/api/items/${id}`, config);
        setItems(items.filter((item) => item._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Error al borrar item');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Mi Dashboard (CRUD Protegido)</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span>{error}</span>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Crear Nuevo Item</h3>
        <form className="space-y-4" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Nombre"
            required
            className="w-full px-3 py-2 border rounded text-gray-900"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="w-full px-3 py-2 border rounded text-gray-900"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Crear
          </button>
        </form>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Mis Items</h3>
        {loading && <p>Cargando items...</p>}
        <ul className="space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <li key={item._id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                  Borrar
                </button>
              </li>
            ))
          ) : (
            !loading && <p>No tienes items.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

function ExternalApiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/external/random-api');
        setData(res.data.entries[0]);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar API externa');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-4">API Externa (PublicAPIs)</h2>
      {loading && <p>Cargando datos externos...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span>{error}</span>
        </div>
      )}
      {data && (
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-blue-500">{data.API}</h3>
          <p><span className="font-bold">Descripción:</span> {data.Description}</p>
          <p><span className="font-bold">Categoría:</span> {data.Category}</p>
          <a href={data.Link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:underline">
            Visitar Link &rarr;
          </a>
        </div>
      )}
    </div>
  );
}

// --- 4. APLICACIÓN PRINCIPAL ---
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="external-api"
              element={<ProtectedRoute><ExternalApiPage /></ProtectedRoute>}
            />
            <Route index element={<Navigate to="/dashboard" replace />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;