import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      dateofbirth: Yup.date().required(),
      weight: Yup.number().required(),
      size: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const userExists = await Students.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { name, dateofbirth, weight, size } = await Students.create(req.body);

    return res.json({ name, email, dateofbirth, weight, size });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),

      dateofbirth: Yup.date().required(),
      weight: Yup.number().required(),
      size: Yup.number().required(),
      email_old: Yup.string().email(),
      email: Yup.string()
        .email()
        .when('email_old', (email_old, field) =>
          email_old ? field.required() : field
        ),
      email_confirm: Yup.string().when('email', (email, field) =>
        email ? field.required().oneOf([Yup.ref('email')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, email_old } = req.body;

    if (email_old) {
      const studentExists = await Students.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const student = await Students.findOne({ where: { email: email_old } });

    if (!student) {
      return res.status(400).json({ error: 'User does not exists' });
    }
    const { name, dateofbirth, weight, size } = await student.update(req.body);
    return res.json({ name, email, dateofbirth, weight, size });
  }
}

export default new StudentsController();
