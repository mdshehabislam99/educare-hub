import { Navbar } from "@/components/shared/Navbar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
