import { Form } from 'antd'
import { LoginField } from './components'

function App() {
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <LoginField />
    </Form>
  )
}

export default App
