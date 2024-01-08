import { useContext } from 'react'
import { List } from 'antd'
import { Link } from 'react-router-dom'

// contexts
import { Context } from 'contexts/mainContext'

const JokesList = () => {
    const { jokes } = useContext(Context);
  
    return (
      <div>
        <List
          bordered
          header={<p style={{fontWeight:"bold", fontSize:17}}>Jokes :</p>}
          dataSource={jokes}
          renderItem={(item) => (
            <>
              <List.Item>
                    <Link to={'/jokes/' + item.id}>{item.question}</Link>
                  <p>{item.answer}</p>
              </List.Item>
            </>
          )}
        />
      </div>
    )
}

export default JokesList