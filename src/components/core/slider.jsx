import React from 'react';
import { Slide } from 'react-slideshow-image';

const images = [
    'https://starwarsblog.starwars.com/wp-content/uploads/2015/10/tfa_poster_wide_header-1536x864-959818851016.jpg',
    'https://starwarsblog.starwars.com/wp-content/uploads/2019/03/star-wars-celebration-chicago-lightspeed-tall-C.jpg'
 ]
const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  }

const Slider = () => {
    return (        <Slide {...properties}>
        {
          images.map((item, index) => {
            return <div  key={index} className="each-slide container">
              <div className="" style={{
                'backgroundImage': `url(${item})`,
                height: '450px', width: '100%'
              }}>
              </div>
            </div>
          })
        }
      </Slide> );
}
 
export default Slider;