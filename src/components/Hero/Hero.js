import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeroImg from '../../assets/images/hero/HeroImg.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate('/shop')
  }
  const handleSignUpClick = () => {
    navigate('/signup')
  }

  return (
    <section className="relative">
      <div class="flex flex-row  bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l">
        <div class="relative mx-auto md:max-w-1/2 max-w-screen-lg px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div class="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              Empower Your Commerce Journey
              <strong class="block font-extrabold pb-2">Buy, Sell, Thrive</strong>
            </h1>

            <p class="mt-4 max-w-lg sm:text-xl/relaxed">
              Join our dynamic marketplace where you can effortlessly buy what you love and sell
              what you cherish – a seamless hub for commerce enthusiasts to thrive
            </p>

            <div class="mt-8 flex flex-wrap gap-4 text-center">
              <button
                onClick={handleExploreClick}
                class="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow  focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Explore
              </button>

              <button
                onClick={handleSignUpClick}
                class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow  focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div class="relative mx-auto md:max-w-1/2 max-w-screen-lg px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <img src={HeroImg} alt="" className="w-[35vw]" />
        </div>
      </div>
    </section>
  );
}

export default Hero