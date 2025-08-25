import React from 'react';
import logo from './logo.svg';
import './App.css';

import awsconfig from './aws-exports';

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { I18n } from '@aws-amplify/core';

// Configuración Amplify
Amplify.configure(awsconfig);

// Diccionario español
I18n.putVocabularies({
  es: {
    'Sign In': 'Iniciar sesión',
    'Sign in': 'Iniciar sesión',
    'Sign Out': 'Cerrar sesión',
    'Username': 'Usuario',
    'Password': 'Contraseña',
    'Forgot your password?': '¿Olvidaste tu contraseña?',
    'Reset your password': 'Restablecer contraseña',
    'Create Account': 'Crear cuenta',
    'No account?': '¿No tienes una cuenta?',
    'Have an account?': '¿Ya tienes una cuenta?',
    'Sign Up': 'Registrarse',
    'Email': 'Correo electrónico',
    'Confirm Password': 'Confirmar contraseña',
  }
});

// Fijar idioma español
I18n.setLanguage('es');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <p>Hola <strong>{user?.username}</strong> 👋</p>
              <button onClick={signOut}>Cerrar sesión</button>
            </div>
          )}
        </Authenticator>
      </header>
    </div>
  );
}

export default App;
