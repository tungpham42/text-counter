import React, { useState } from "react";
import { Container, Form, Card, Row, Col, Table } from "react-bootstrap";

const Counter = () => {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const countCharacters = (text) => {
    return text.length;
  };

  const countSentences = (text) => {
    const trimmedText = text.trim();
    if (trimmedText === "") return 0;
    return trimmedText
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;
  };

  const countParagraphs = (text) => {
    const trimmedText = text.trim();
    if (trimmedText === "") return 0;
    return trimmedText
      .split(/\n+/)
      .filter((paragraph) => paragraph.trim().length > 0).length;
  };

  const calculateKeywordDensity = (text) => {
    const words = text.trim().toLowerCase().split(/\s+/);
    const totalWords = words.length;
    const wordCount = {};

    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const keywordDensity = Object.keys(wordCount).map((word) => ({
      word: word,
      count: wordCount[word],
      density: ((wordCount[word] / totalWords) * 100).toFixed(2),
    }));

    return keywordDensity.sort((a, b) => b.count - a.count);
  };

  const keywordDensity = calculateKeywordDensity(text);

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="textInput">
                  <Form.Label>Enter Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={text}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
              <div className="mt-4">
                <h5>Character Count: {countCharacters(text)}</h5>
                <h5>Word Count: {countWords(text)}</h5>
                <h5>Sentence Count: {countSentences(text)}</h5>
                <h5>Paragraph Count: {countParagraphs(text)}</h5>
              </div>
              <div className="mt-4">
                <h5>Keyword Density</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Keyword</th>
                      <th>Count</th>
                      <th>Density (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordDensity.map((item, index) => (
                      <tr key={index}>
                        <td>{item.word}</td>
                        <td>{item.count}</td>
                        <td>{item.density}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Counter;
