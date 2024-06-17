import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    { title: 'Eco-Friendly Cars', description: 'Rent the latest hybrid and electric vehicles.', icon: '/assets/images/eco-friendly.png' },
    { title: 'Flexible Rentals', description: 'Choose from hourly, daily, or monthly rentals.', icon: '/assets/images/goodprice.jpg' },
    { title: '24/7 Support', description: 'We are here to help you anytime, anywhere.', icon: '/assets/images/support_call.jpg' }
  ];

  fleet = [
    { model: 'Tesla Model 3', description: 'Experience the future of driving.', image: '/assets/images/Tesla_M_3.jpeg' },
    { model: 'Nissan Leaf', description: 'Eco-friendly and efficient.', image: '/assets/images/Nissan-Leaf.jpg' },
    { model: 'M235i xDrive Gran Coupe', description: 'TwinPower Turbo inline 4-cylinder', image: '/assets/images/BMW-Series-Gran-Coupe.jpeg' }
  ];

  testimonials = [
    { text: 'NextGen Car Rental made my trip so much easier and eco-friendly!', author: 'Jenae Burton' },
    { text: 'Great service and amazing selection of cars.', author: 'Jhamar Barnaby' },
    { text: 'I loved the Tesla Model 3, will definitely rent again.', author: 'Jana Parnelle' }
  ];
}
