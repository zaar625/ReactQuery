
import './App.css';
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Posts from './Posts'

function App() {
  // 클라이언트가 가지고 있는 캐시와 모든 기본 옵션을 자녀 컴포넌트도 사용할 수 있게 합니다. 
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    {/* The rest of your application */}
    <div className='App'>
      <h1>React-Query Blog</h1>
      <Posts/>
    </div>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}

export default App
