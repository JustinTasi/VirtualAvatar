import '@/styles/main.scss';
import type { AppProps } from 'next/app';
// import { LoadingProvider } from '../context/LoadingContext';
// import { MessageModalProvider } from '../context/MessageModalContext';
// import { AuthProvider } from '@/context/AuthContext';
// import { FormDataProvider } from '@/context/FormContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <LoadingProvider>
    //   <MessageModalProvider>
    //     <AuthProvider>
    //       <FormDataProvider>
    //       </FormDataProvider>
    //     </AuthProvider>
    //   </MessageModalProvider>
    // </LoadingProvider>
    <Component {...pageProps} />

  );
}