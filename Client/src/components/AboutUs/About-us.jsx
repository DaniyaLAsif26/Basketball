import './about-us.css'
import white from '../../assets/white.png'
import president from '../../assets/Sridhar.jpg'
import secratory from '../../assets/prudhvi.jpg'

import Member from './member'

export default function AboutUs() {

const members =[
    {name : "Maqsood Bin Ahmed Zakir" , role : "Chairman"},
    {name : "Mohd. Abdul Hafeez khan" , role : "Vice President"},
    {name : "Vijaya Saradhi" , role : "Vice President"},
    {name : "Dr. Veno Gopal Reddy" , role : "Vice President"},
    {name : "U. Chandra Mohan Goud" , role : "Vice President"},
    {name : "N. Chandrashekar" , role : "Treasurer"},
    {name : "Mohammed Samiuddin" , role : "Joint Secretary"},
    {name : "A. Vishnu Kumar Goud" , role : "Joint Secretary"},
    {name : "Sukumar Francis" , role : "Associate Secretary"},
    {name : "Hyder Mohammed" , role : "Associate Secretary"},
]

    return (
        <div className="about-us-cont">
            <div className="about-us-head">
                <div className="flip-item flip-name">
                    <h2>TELANGANA&nbsp; BASKETBALL&nbsp; ASSOCIATION</h2>
                </div>
                <div className="flip-item flip-img">
                    <img src={white} alt="" />
                </div>
                <div className="flip-item flip-name">
                    <h2>ABOUT US</h2>
                </div>
            </div>
            <div className="about-us">
                <div>The Telangana Basketball Association (TBA) is the official governing body responsible for the promotion, development, and regulation of basketball across the state of Telangana. Committed to excellence and integrity, the Association works to nurture talent, organize competitive platforms, and uphold the spirit of the game at all levels.</div>
                <div>TBA plays a key role in identifying and developing young athletes by conducting district, state, and selection tournaments for both men and women. Through structured competitions, coaching initiatives, and grassroots programs, the Association strives to create a strong pathway for players to progress from local courts to national and international arenas.</div>
                <div>With a focus on discipline, teamwork, and sportsmanship, the Telangana Basketball Association collaborates with schools, colleges, clubs, and affiliated district units to strengthen basketball infrastructure and opportunities throughout the state. The Association also ensures that all activities are conducted in accordance with the rules and standards set by the national basketball governing bodies.</div>
                <div>Driven by a vision to make basketball one of the leading sports in Telangana, TBA continues to empower athletes, officials, and coaches while fostering a vibrant basketball culture for future generations.</div>
            </div>
            <div className="abt-pres">
                <div className="pres-img">
                    <img src={president} alt="" />
                    <div className="pres-head">
                        <h2>Sridhar Reddy</h2>
                        <div>President, TBA</div>
                    </div>
                </div>
                <div className="pres-msg">
                    <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quod error accusamus ab repellendus modi animi ea odio repellat sequi dolores explicabo, odit veniam non, a in quia facere possimus enim sapiente illo officiis aperiam exercitationem! Ipsa doloremque mollitia provident assumenda ad amet rem iure similique eos perspiciatis, nemo nesciunt excepturi adipisci quas dicta. Ipsam libero dignissimos odio quaerat, voluptatibus quisquam excepturi nam eum sit, ex repudiandae porro vero quos maiores dolorem ullam non itaque molestias ratione earum eveniet. Rem esse recusandae exercitationem nostrum maiores quidem deserunt tempora, corrupti voluptas numquam amet laborum? Labore placeat tempora dicta ratione, sint amet neque magni voluptatum illo, cumque consectetur aperiam commodi, minus nemo. Dicta, itaque. Porro numquam placeat distinctio, ab perferendis, rerum unde neque ipsa amet nisi, odio quae!</div>
                </div>
            </div>
            <div className="abt-pres abt-sec">
                <div className="pres-msg">
                    <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae quod error accusamus ab repellendus modi animi ea odio repellat sequi dolores explicabo, odit veniam non, a in quia facere possimus enim sapiente illo officiis aperiam exercitationem! Ipsa doloremque mollitia provident assumenda ad amet rem iure similique eos perspiciatis, nemo nesciunt excepturi adipisci quas dicta. Ipsam libero dignissimos odio quaerat, voluptatibus quisquam excepturi nam eum sit, ex repudiandae porro vero quos maiores dolorem ullam non itaque molestias ratione earum eveniet. Rem esse recusandae exercitationem nostrum maiores quidem deserunt tempora, corrupti voluptas numquam amet laborum? Labore placeat tempora dicta ratione, sint amet neque magni voluptatum illo, cumque consectetur aperiam commodi, minus nemo. Dicta, itaque. Porro numquam placeat distinctio, ab perferendis, rerum unde neque ipsa amet nisi, odio quae!</div>
                </div>
                <div className="pres-img">
                    <img src={secratory} alt="" />
                    <div className="pres-head">
                        <h2>Ambati Prudhvi Reddy</h2>
                        <div className='main-member-role'>General Secratory, TBA</div>
                    </div>
                </div>
            </div>
            <Member data={members}/>
        </div>
    )
}