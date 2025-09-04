import React, { useRef, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";


const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: import.meta.env.VITE_TO_NAME,
                    from_email: form.email,
                    to_email: import.meta.env.VITE_TO_MAIL,
                    message: form.message,
                },
                import.meta.env.VITE_EMAILJS_PUB_KEY
            )
            .then(
                () => {
                    setLoading(false);
                    toast.success("We will get back to you soon");
                    setForm({ name: "", email: "", message: "" });
                },
                (error) => {
                    setLoading(false);
                    console.log(error);
                    toast.error("Something went wrong. Please try again.");
                }
            );
    };

    return (
        <div className="px-6 md:px-20">
            {/* Header */}
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>
                    <span className="font-semibold text-black">CONTACT US</span>
                </p>
            </div>

            {/* Office Info */}
            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20 text-sm">
                <img
                    className="w-full max-w-[360px] rounded-lg"
                    src={assets.contact_image}
                    alt=""
                />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
                    <p className="text-gray-500">
                        54709 Sion Station <br />
                        Suite 350, Mumbai, India
                    </p>
                    <p className="text-gray-500">
                        Tel: (012) 345-6789 <br /> Email: satthvik1026@gmail.com
                    </p>
                    <p className="font-semibold text-lg text-gray-600">
                        Careers at DOCLYNK
                    </p>
                    <p className="text-gray-500">
                        Learn more about our teams and job openings.
                    </p>
                    <button
                        onClick={() => toast("No jobs available now")}
                        className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
                    >
                        Explore Jobs
                    </button>
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-blue-50 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-6 text-gray-700">Send us a Message</h3>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    <label className="flex flex-col">
                        <span className="text-gray-600 font-medium mb-2">Your Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="What's your name?"
                            className="bg-white border border-gray-300 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-gray-600 font-medium mb-2">Your Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="What's your email?"
                            className="bg-white border border-gray-300 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-gray-600 font-medium mb-2">Your Message</span>
                        <textarea
                            rows="5"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What do you want to say?"
                            className="bg-white border border-gray-300 py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
