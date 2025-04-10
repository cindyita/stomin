import InputError from '@/Components/Form/InputError';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';
import OpenModal from '@/Components/OpenModal';
import ModalBox from '@/Components/ModalBox';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <OpenModal className="btn btn-danger" id="confirmingUserDeletion">
                Delete Account
            </OpenModal>

            { /* Modales */}
            <ModalBox id="confirmingUserDeletion" title="Confirm delete" saveBtn="">
                <form onSubmit={deleteUser} className="p-6">
                    <h4>
                        Are you sure you want to delete your account?
                    </h4>

                    <p>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >Entry your password:</label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="form-control"
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 d-flex justify-content-end">
                        <button className="btn btn-muted" data-bs-dismiss="modal">
                            Cancel
                        </button>

                        <button className="ms-3 btn btn-danger" disabled={processing}>
                            Delete Account
                        </button>
                    </div>
                </form>
            </ModalBox>
        </section>
    );
}
