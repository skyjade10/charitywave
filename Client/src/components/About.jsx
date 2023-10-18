
import React, { useState, useRef} from "react";

const About = () => {
    const [activeToggles, setActiveToggles ] = useState(false);
    const scrollRef = useRef()
    const para = " text-sm"
    const header = " text-lg"

    const activeToggle = (e) => {
        e.preventDefault()

        const eName = e.target.name;

        if(eName === "about"){
            var activeTab1 = document.getElementsByName("about")
            activeTab1[0].classList.add("border-b-2")
            const activeTab2 = document.getElementsByName("terms")
            activeTab2[0].classList.remove("border-b-2")
            const activeTab3 = document.getElementsByName("contact")
            activeTab3[0].classList.remove("border-b-2")
            console.log(e)
            const targetElement = document.getElementById('about')
            const {x, y} = targetElement.getBoundingClientRect()
            console.log(x,y)
            window.scrollTo(x,y)
        }
        if(eName === "terms"){
            var activeTab1 = document.getElementsByName("about")
            activeTab1[0].classList.remove("border-b-2")
            const activeTab2 = document.getElementsByName("terms")
            activeTab2[0].classList.add("border-b-2")
            const activeTab3 = document.getElementsByName("contact")
            activeTab3[0].classList.remove("border-b-2")
            console.log("terms")
            const targetElement = document.getElementById('terms')
            const {x, y} = targetElement.getBoundingClientRect() 
            console.log(x,y)
            window.scrollTo(x,y)
        }
        if(eName === "contact"){
            var activeTab1 = document.getElementsByName("about")
            activeTab1[0].classList.remove("border-b-2")
            const activeTab2 = document.getElementsByName("terms")
            activeTab2[0].classList.remove("border-b-2")
            const activeTab3 = document.getElementsByName("contact")
            activeTab3[0].classList.add("border-b-2")
            console.log("contact")
            const targetElement = document.getElementById('contact')
            const {x,y} = targetElement.getBoundingClientRect() 
            console.log(targetElement.getBoundingClientRect())
            console.log(x,y)
            window.scrollTo(x,y)
        }

    } 

    return (
        <div className="background-gradient w-full min-h-screen grid grid-col-[auto] justify-center">
            <div className=" fixed justify-self-center w-fit md:w-[500px] lg:w-[700px] background-gradient-v flex flex-row  justify-center gap-3 h-10 p-2 font-bold ">
                <button className=" " name="about"  onClick={activeToggle}>About</button>
                <div className=" flex items-center "><hr className=" w-[2px] h-[70%] bg-white"/></div>
                <button name="terms"  onClick={activeToggle}>Terms & Conditions</button>
                <div className=" flex items-center "><hr className=" w-[2px] h-[70%] bg-white "/></div>
                <button name="contact" onClick={activeToggle}>Contact</button>
            </div>
            
            <div className="bg-gray-50 flex w-fit md:w-[500px] lg:w-[700px] flex-col text-left items-center border-2 rounded-lg shadow-md mx-4 mb-5 mt-10 gap-4  p-10" id="about">
                <div className=" font-bold border-b-2 w-3/4 text-center">
                        <h2>ABOUT</h2>
                </div>
                <div className="flex-initial items-start text-gray-800">
                    <p>Charitywave stands as a beacon of hope in the realm of philanthropy, pioneering a revolutionary approach to giving through its decentralized donation and contribution platform. With its innovative technology, Charitywave empowers individuals and organizations worldwide to make a tangible difference in the lives of those in need. By eliminating intermediaries and leveraging blockchain technology, this platform ensures that every donation directly reaches its intended cause, maximizing the impact of charitable acts. Through Charitywave, the spirit of generosity transcends boundaries, fostering a global community dedicated to creating positive change. As a trailblazer in decentralized charity, Charitywave exemplifies the future of giving, where transparency, efficiency, and compassion converge to transform the world, one donation at a time.</p>
                </div>
                <div className=" my-5"></div>
                <div ref={scrollRef} className=" font-bold border-b-2 w-3/4 text-center" id="terms">
                    <h2><b>TERMS AND CONDITIONS ("Terms")</b></h2>
                </div>
                <div className=" space-y-4 ">
                    

                    <p>Our Terms and Conditions were last updated on 8th October, 2023.</p>

                    <p>
                        Please read these terms and conditions carefully before using Our Service.
                    </p>
                        <b>Interpretation and Definitions</b>
                        <h6 className=" font-bold text-gray-600">Interpretation</h6>

                    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                    Definitions

                    <p>For the purposes of these Terms and Conditions:</p>

                    <ul className=" list-disc space-y-4 ms-10">
                        <li><b>“Affiliate”</b> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                        <li><b>“Account”</b> means a unique account created for You to access our Service or parts of our Service.</li>
                        <li><b>“Company”</b> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to CharityWave</li>
                        <li><b>“Country”</b> refers Zambia</li>
                        <li><b>“Content”</b> refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.</li>
                        <li><b>“Device”</b> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                        <li><b>“Feedback”</b> means feedback, innovations or suggestions sent by You regarding the attributes, performance or features of our Service.</li>
                        <li><b>“Products”</b> refer to the products or items offered for sale on the Service.</li>
                        <li><b>“Orders”</b> mean a request by You to purchase Products from Us.</li>
                        <li><b>“Promotions”</b> refer to contests, sweepstakes or other promotions offered through the Service.</li>
                        <li><b>“Service”</b> refers to the Website.</li>
                        <li><b>“Terms and Conditions”</b> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions Agreement was generated by TermsFeed Terms and Conditions Generator.</li>
                        <li><b>“Third-party Social Media Service”</b> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</li>
                        <li><b>“Website”</b> refers to CharityWave, accessible from www.charitywave.org</li>
                        <li><b>“You”</b> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                        
                    </ul>
                    <h5><b>Acknowledgment</b></h5>

                    <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>

                    <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>

                    <p>
                        By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                        You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                        Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
                    </p>
                    <h5><b>User Accounts</b></h5>

                    <p>
                        When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
                        You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.
                    </p>

                    <p>You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</p>

                    <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.</p>
                    <h5><b>Content</b></h5>
                    <h6>Your Right to Post Content</h6>

                    <p>Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness.</p>

                    <p>By posting Content to the Service, You grant Us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of Your rights to any Content You submit, post or display on or through the Service and You are responsible for protecting those rights. You agree that this license includes the right for Us to make Your Content available to other users of the Service, who may also use Your Content subject to these Terms.</p>

                    <p>You represent and warrant that: (i) the Content is Yours (You own it) or You have the right to use it and grant Us the rights and license as provided in these Terms, and (ii) the posting of Your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</p>
                    <h6 className=" font-bold text-gray-600">Content Restrictions</h6>

                    <p>The Company is not responsible for the content of the Service's users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account.</p>

                    <p>You may not transmit any Content that is unlawful, offensive, upsetting, intended to disgust, threatening, libelous, defamatory, obscene or otherwise objectionable. Examples of such objectionable Content include, but are not limited to, the following:</p>

                    <ul className=" list-disc ms-10" >
                        <li >Unlawful or promoting unlawful activity.</li>
                        <li>Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups.</li>
                        <li>Spam, machine – or randomly – generated, constituting unauthorized or unsolicited advertising, chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling.</li>
                        <li>Containing or installing any viruses, worms, malware, trojan horses, or other content that is designed or intended to disrupt, damage, or limit the functioning of any software, hardware or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of a third person.</li>
                        <li>Infringing on any proprietary rights of any party, including patent, trademark, trade secret, copyright, right of publicity or other rights.</li>
                        <li>Impersonating any person or entity including the Company and its employees or representatives.</li>
                        <li>Violating the privacy of any third person.</li>
                        <li>False information and features.</li>
                    </ul>

                    <p>The Company reserves the right, but not the obligation, to, in its sole discretion, determine whether or not any Content is appropriate and complies with this Terms, refuse or remove this Content. The Company further reserves the right to make formatting and edits and change the manner of any Content. The Company can also limit or revoke the use of the Service if You post such objectionable Content. As the Company cannot control all content posted by users and/or third parties on the Service, you agree to use the Service at your own risk. You understand that by using the Service You may be exposed to content that You may find offensive, indecent, incorrect or objectionable, and You agree that under no circumstances will the Company be liable in any way for any content, including any errors or omissions in any content, or any loss or damage of any kind incurred as a result of your use of any content.</p>
                    <h6 className=" font-bold text-gray-600">Content Backups</h6>

                    <p>Although regular backups of Content are performed, the Company does not guarantee there will be no loss or corruption of data.</p>

                    <p>Corrupt or invalid backup points may be caused by, without limitation, Content that is corrupted prior to being backed up or that changes during the time a backup is performed.</p>

                    <p>The Company will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that the Company has no liability related to the integrity of Content or the failure to successfully restore Content to a usable state.</p>

                    <p>You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.</p>
                    <h5><b>Copyright Policy</b></h5>
                    <h6 className=" font-bold text-gray-600">Intellectual Property Infringement</h6>

                    <p>We respect the intellectual property rights of others. It is Our policy to respond to any claim that Content posted on the Service infringes a copyright or other intellectual property infringement of any person.</p>

                    <p>If You are a copyright owner, or authorized on behalf of one, and You believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, You must submit Your notice in writing to the attention of our copyright agent via email ([COPYRIGHT_AGENT_CONTACT_EMAIL]) and include in Your notice a detailed description of the alleged infringement.</p>

                    <p>You may be held accountable for damages (including costs and attorneys' fees) for misrepresenting that any Content is infringing Your copyright.</p>

                    <h6>Promotions</h6>

                    <p>Any Promotions made available through the Service may be governed by rules that are separate from these Terms.</p>

                    <p>If You participate in any Promotions, please review the applicable rules as well as our Privacy policy. If the rules for a Promotion conflict with these Terms, the Promotion rules will apply.</p>
                    <h5><b>Intellectual Property</b></h5>

                    <p>The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.</p>

                    <p>The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>

                    <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</p>
                    <h5><b>Your Feedback to Us</b></h5>

                    <p>You assign all rights, title and interest in any Feedback You provide the Company. If for any reason such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty free, worldwide right and license to use, reproduce, disclose, sub-license, distribute, modify and exploit such Feedback without restriction.</p>
                    <h5><b>Links to Other Websites</b></h5>

                    <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>

                    <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

                    <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
                    <h5><b>Termination</b></h5>

                    We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.

                    <p>Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.</p>
                    <h5><b>Limitation of Liability</b></h5>

                    <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>

                    <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>

                    <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.</p>
                    <h5><b>"AS IS" and "AS AVAILABLE" Disclaimer</b></h5>

                    <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>

                    <p>Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>

                    <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
                    <h5><b>Governing Law</b></h5>

                    <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
                    <h5><b>Disputes Resolution</b></h5>

                    <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
                    <h5><b>Severability and Waiver</b></h5>
                    <h6 className=" font-bold text-gray-600">Severability</h6>

                    <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>

                    <h6 className=" font-bold text-gray-600">Waiver</h6>

                    <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.</p>

                    <h5><b>Changes to These Terms and Conditions</b></h5>
                    <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>

                    <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>


                </div>
                <div className=" my-5"></div>
                <div ref={scrollRef} className=" font-bold border-b-2 w-3/4 text-center" id="contact">
                    <h2><b>CONTACT</b></h2>
                </div>
                <div>

                    <h5><b>Contact Us</b></h5>

                    <p>If you have any questions about these Terms and Conditions , You can contact us:</p>
                    <p>nzambwe@gmail.com</p>

                </div>
                

            </div>
            
        </div>
    )
}

export default About;