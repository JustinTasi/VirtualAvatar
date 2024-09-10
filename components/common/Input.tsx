import { UseFormRegister } from 'react-hook-form';

export default function Input({
  text, name, type, fatherClassName, onClick, value,
  className, require, register, readonly,
}: {
    text?: string,
    name: string,
    type: string,
    value?: string,
    fatherClassName: any,
    className?: any,
    require: boolean,
    register: UseFormRegister<any>,
    readonly?: boolean;
    onClick?: () => void;
  }) {
  return (
    <div className={fatherClassName}>
      <label htmlFor="name" style={ { 'width': 'auto' } }>{text}</label>
      <input id={name} type={type} value={value} className={className} {...register(name, { 'required': require })}
        readOnly={readonly} onClick={onClick}/>
    </div>
  );
}