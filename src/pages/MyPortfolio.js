import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='px-4 lg:px-0 py-4 mx-auto container' style={{minHeight:'80vh'}}>
            <h2 className='text-3xl font-bold text-secondary mb-3'>My Portfolio</h2>
            <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>Md. Samiul Hasan</td>
                            </tr>
                            <tr>
                                <th>Email: </th>
                                <td>samiulxhasan650@gmail.com</td>
                            </tr>
                            <tr>
                                <th>Education</th>
                                <td>
                                    <p>Diploma in Computer Engineering</p>
                                    <p>Rajshahi Polytechnic Institute</p>
                                </td>
                            </tr>
                            <tr>
                                <th>Technologies or <br /> Skills and Tools</th>
                                <td>
                                    <p><span className='text-lg font-bold'>Technology:</span> HTML, CSS, JavaScript (ES6), React,
                                        Bootstrap, React Bootstrap, React Query,
                                        Axios TailwindCSS, React Router, SCSS,
                                        React Router Dom,Nodejs, ExpressJs, MongoDB
                                    </p>
                                    <p><span className='text-lg font-bold'>Tools:</span> Github, VS Code, Chrome Dev Tools,
                                        Heroku, Netlify,vercel, Postman,
                                        Photoshop, Figma,Firebase, Illustrator,
                                        Adobe XD, Slack</p>
                                </td>
                            </tr>
                            <tr>
                                <th>Live Project:</th>
                                <td>
                                    <h3 className='text-lg font-bold'>Xtreme Cars || Full Stack Car Stock Management SPA <a className='text-green-500' href="https://xtreme-cars-2022.web.app/">(Live Site)</a></h3>
                                    <h3 className='text-lg font-bold'>Gym Trainer Website SPA (Live Site) <a className='text-green-500' href="https://sam-professional-trainer.web.app/">(Live Site)</a></h3>
                                    <h3 className='text-lg font-bold'>Random Laptop Picker/Chooser SPA <a className='text-green-500' href="https://laptop-picker.vercel.app/">(Live Site)</a></h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;