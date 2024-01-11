
import APIProvider from '@/CustomHooks/useGetAPI'
import './globals.css'
import UserDetailProvider from '@/CustomHooks/useUserDetail'
import { ToastMessageProvider } from '@/components/ToastMessage/ToastMessage'
import { LoadingProvider } from '@/components/PreLoader/PreLoader'


export const metadata = {
  title: 'Anisole CMS',
  description: 'Content Management System Created By Anisole',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <APIProvider>
        <ToastMessageProvider>
          <LoadingProvider>

            <UserDetailProvider>

              <body >{children}</body>

            </UserDetailProvider>
          </LoadingProvider>
        </ToastMessageProvider>
      </APIProvider>
    </html>
  )
}
