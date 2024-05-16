import { Form } from "@/components/Form";
import { Header } from "@/components/Header";


export default function Home() {
  return (
    <div className="min-h-screen ">
     <Header/>
     <div className="pt-7 grid justify-center px-5">
      

      <div className="mt-5 w-full">
        <Form/>
      </div>
     </div>
    </div>
  );
}
