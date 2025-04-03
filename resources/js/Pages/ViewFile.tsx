import ViewLayout from "@/Layouts/ViewLayout";
import { Head, usePage } from "@inertiajs/react";

export default function ViewFile() {

    const file = usePage().props.file ?? { name: '?' };
    const name = file.name;

    return (
        <>
            <Head title="View File" />
            <ViewLayout header={name}>
                <div>
                    {file.name}
                </div>
            </ViewLayout>
        </>
    );
}