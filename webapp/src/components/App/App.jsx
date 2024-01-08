import React, { useContext} from 'react';
import { useNavigate, Link, Route, Routes, useMatch } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import About from 'components/about/About';
import Joke from 'components/joke/Joke';
import JokesList from 'components/jokes/Jokes';
// contexts
import { Context } from 'contexts/mainContext'

const { Header, Content } = Layout



const App = () => {
  const { getJokeWithScores } = useContext(Context);

  const match = useMatch('/jokes/:id')
  const joke = match 
    ? match.params.id
    : null

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
          <Menu.Item key={0}><Link to={'/'}>Jokes</Link></Menu.Item>
          <Menu.Item key={1}><Link to={'/about'}>About</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '30px 50px' }}>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/jokes/:id" element= {<Joke jokeId={joke} /> }/>
                <Route path="/" element={<JokesList />} />
            </Routes>
      </Content>
    </Layout>
  )
}

export default App
