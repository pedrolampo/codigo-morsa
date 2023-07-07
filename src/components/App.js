import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Stack,
} from 'react-bootstrap';
import CODE from '../utils/morseCode.json';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState([]);
  const inputRef = useRef();

  const array = [];

  useEffect(() => {}, [translation]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = inputRef.current.value;

    if (!text) return;
    setLoading(true);
    setTranslation([]);

    text
      .toLowerCase()
      .split('')
      .forEach((char) => {
        Object.keys(CODE)
          .filter((key) => key.match(char))
          .forEach((key) => {
            array.push(CODE[key]);
            setTranslation((prev) => {
              return [...prev, CODE[key]];
            });
          });
      });

    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center my-4">
      <Card className="w-100" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <h1 className="mb-4">Código Morsa</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel
                controlId="input"
                label="Texto a traducir"
                className="mb-3"
              >
                <Form.Control ref={inputRef} type="text" placeholder="Hola" />
              </FloatingLabel>
              <Button disabled={loading} className="w-100" type="submit">
                Traducir
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>

        {translation && (
          <Card.Footer>
            <h4 className="mb-3">Traduccion:</h4>
            {translation.map((icon) => {
              return (
                <Stack direction="horizontal">
                  {icon.split(' ').map((el) => {
                    if (el === 'void') return <hr key={(el = Math.random())} />;
                    return (
                      <img
                        key={el + Math.random()}
                        alt="Walrus"
                        src={`/media/images/${el}.png`}
                      />
                    );
                  })}
                </Stack>
              );
            })}
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
}

export default App;
