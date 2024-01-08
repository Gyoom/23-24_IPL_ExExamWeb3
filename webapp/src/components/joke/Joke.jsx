import { useContext, useEffect, useState } from 'react'
import { List, Form, Button, Input, InputNumber } from 'antd'
// contexts
import { Context } from 'contexts/mainContext'

const Joke = ({ jokeId }) => {
    const { addScore, getJokeWithScores } = useContext(Context);
    const [ joke, setJoke ] = useState(null)

    useEffect(() => {
       var joke = getJokeWithScores(jokeId)
       setJoke(joke)
    }, [])

    const handleSubmit = async (values) => {
        values.date = new Date()
        values.joke = joke.id
        
        await addScore(values)
        
        setJoke(getJokeWithScores(jokeId));

    }

    const handleErrorSubmit = (errorInfo) => {
      console.log('Failed:', errorInfo);
    }
    return (
        <div>
            { joke ? <>
            <p>id : {joke.id}</p> 
            <p>Question : {joke.question}</p> 
            <p>Answer : {joke.answer}</p> 
            <p>Category : {joke.category}</p> 
            <p>Score Count : {joke.scoreCount}</p> 
            <p>Average Score : {joke.averageScore}</p> 
            <List
                bordered
                header={<p style={{fontWeight:"bold", fontSize:17}}>Scores :</p>}
                dataSource={joke.scores}
                renderItem={(item) => (
                    <>
                    <List.Item>
                        <p>{item.date} {item.username} {item.score}</p>
                    </List.Item>
                    </>
                )}
            />
             <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={handleSubmit}
                onFinishFailed={handleErrorSubmit}
                autoComplete="off"
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input a username ...' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Score"
                    name="score"
                    rules={[{ required: true, message: 'Please input a score' }]}
                >
                    <InputNumber max={10} min={0} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>

            </Form>
            </> :
            <></> }
        </div>
    )
}

export default Joke