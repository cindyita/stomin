import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    textLabel = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement> & { textLabel: string }) {
    
    return (
        <>
        <div className="form-check">
            <input className={
                'form-check-input' +
                className
            } type="checkbox" {...props} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {textLabel}
            </label>
        </div>
        </>
    );
}
