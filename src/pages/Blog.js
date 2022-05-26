import React from 'react';

const Blog = () => {
    return (
        <div className='container mx-auto py-20 px-4 md:px-0'>
            <h2 className='text-3xl'>Blog Page</h2>
            <div className=''>
                <h4 className='text-2xl font-bold'>1. How will you improve the performance of a React Application?</h4>
                <div>
                    <ul>
                        <li>=> Pagination or Table data Scroll to revel data for show huge data</li>
                        <li>=> Keeping component state local where necessary</li>
                        <li>=> Memoizing React components to prevent unnecessary re-renders</li>
                        <li>=> Code-splitting in React using dynamic import()</li>
                        <li>=> Windowing or list virtualization in React</li>
                        <li>=> Lazy loading images in React</li>
                    </ul>
                </div>
            </div>

            <div>
                <h4 className='text-2xl font-bold mt-3'>2. What are the different ways to manage a state in a React application?</h4>
                <div>
                    <ul>
                        <li>=> Local state</li>
                        <li>=> Global state</li>
                        <li>=> Server state</li>
                        <li>=> URL state</li>
                    </ul>

                    <div className='mt-3'>
                        <div className='py-2'>
                            <h4 className='text-xl font-bold'>Local State</h4>
                            <p>Local state is data we manage in one or another component.</p>
                        </div>
                        <div className='py-2'>
                            <h4 className='text-xl font-bold'>Global State</h4>
                            <p>Global state is data we manage across multiple components.</p>
                        </div>
                        <div className='py-2'>
                            <h4 className='text-xl font-bold'>Server State</h4>
                            <p>Data that comes from an external server that must be integrated with our UI state.</p>
                        </div>
                        <div className='py-2'>
                            <h4 className='text-xl font-bold'>URL State</h4>
                            <p> Data that exists on our URLs, including the pathname and query parameters.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <h4 className='text-2xl font-bold mt-3'>3.  How does prototypical inheritance work?</h4>
                <div>
                    <p>Prototypal  Inheritance  হল javascript  একটি feature  যা Object এ methods  এবং properties  যোগ করতে ব্যবহৃত হয়। এটি এমন একটি method  যার মাধ্যমে একটি object  অন্য  object এর  properties  এবং  Method er Propertise Inherit করতে পারে । একটি object [[properties]] পেতে , getPrototypeOf ব্যবহার করা হয়ে থাকে </p>
                </div>
            </div>

            <div>
                <h4 className='text-2xl font-bold mt-3'>4. Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h4>
                <p>যদি এমন হয় যে কোন ভ্যালু পরবর্তীতে চেঞ্জ করতে হবে তখন তা স্টেট এ সেট করা হযা, যদি স্টেট এ সেট না করা হয় তবে ভ্যালু পরবর্তীতে পরিবর্তন করা যায়. এছাড়া স্টেট ভার্চুয়াল ডোম Provide করে, এটি সর্বদা ডাটা কে ট্র্যাক করে যার ফলে উক্ত data update হলে খুব সহযে UI তে দ্রুত লোড করতে সক্ষম হয়। </p>
                <p>useState() একটি ইনিসিল ভ্যালু গ্রহন করে, এবং একটি মাত্র ভ্যালু , array অথবা object কে আপডেট করতে সক্ষম।  যে কারণে এখানে স্প্রেডপারেটর ব্যবহার করা যাবে না </p>
            </div>


            <div>
                <h4 className='text-2xl font-bold mt-3'>5.  What is a unit test? Why should write unit tests?</h4>
                <p>Unit testing ensures that all code meets quality standards before it's deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and money and helps developers write better code, more efficiently.</p>
            </div>
        </div>
    );
};

export default Blog;