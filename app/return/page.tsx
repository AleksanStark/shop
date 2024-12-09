"use client";
import axios from "axios";
import { useEffect } from "react";

export default function Return() {
  // const [status, setStatus] = useState(null);
  // const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const fetchSessionId = async () => {
      const response = await axios.get("http://localhost:8000/checkout");
      console.log(response.data);
    };
    fetchSessionId();
  }, []);

  // if (status === "open") {
  //   return redirect("/");
  // }

  return <div>sss</div>;
}
