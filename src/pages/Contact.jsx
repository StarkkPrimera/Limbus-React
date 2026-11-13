import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert } from 'react-bootstrap';
import { characters } from '../data/characters.mock';
import { saveData } from '../data/storage';
import { validateName, validateEmail, validateMessage } from '../utils/validators';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  function onSubmit(data) {
    // Es una simulación local: no existe un servidor de correo.
    const saved = saveData('lastSuggestion', { ...data, date: new Date().toISOString() });
    setSent(saved);
    setSaveError(!saved);
    if (saved) reset();
  }

  return <section className="contact-page"><p className="eyebrow">COMUNIDAD / CONTACTO</p><h1>Sugerir una guía</h1>
    <p className="muted">Cuéntanos qué personaje te gustaría ver en el archivo.</p>
    {sent && <Alert variant="success" role="status">Sugerencia guardada en este navegador. Envío simulado.</Alert>}
    {saveError && <Alert variant="danger">No fue posible guardar. Revisa el almacenamiento del navegador.</Alert>}
    <Form className="panel" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name"><Form.Label>Nombre</Form.Label>
        <Form.Control {...register('name', { validate: validateName })} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid" role="alert">{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email"><Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" {...register('email', { validate: validateEmail })} isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid" role="alert">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="character"><Form.Label>Personaje</Form.Label>
        <Form.Select {...register('character', { required: 'Selecciona un personaje.' })} isInvalid={!!errors.character}>
          <option value="">Seleccionar…</option>{characters.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}<option value="otro">Otro personaje</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid" role="alert">{errors.character?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="message"><Form.Label>Mensaje</Form.Label>
        <Form.Control as="textarea" rows={4} {...register('message', { validate: validateMessage })} isInvalid={!!errors.message} />
        <Form.Control.Feedback type="invalid" role="alert">{errors.message?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Guardar sugerencia</Button>
    </Form>
  </section>;
}
