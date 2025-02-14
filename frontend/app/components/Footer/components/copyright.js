import Image from 'next/image';

export function Copyright() {
  return (
    <div className="grid gap-2 md:gap-3 text-black px-6 md:px-[100px] mb-10 md:mb-20">
      <p className="font-poppins text-sm md:text-base ">
        Web3bridge is a program created in 2019 to train Web3 developers in Africa. We are working
        on building sustainable Web3 economy in Africa through remote and onsite Web3 development
        training, supporting web3 developers and startups, and lowering barriers of entry into the
        Web3 ecosystem.
      </p>
      <p className="font-poppins text-sm md:text-base ">We operate a Cohort based model.</p>
      <p className="font-poppins text-sm md:text-base ">
        By using this website, you accept our Terms of Use and Privacy Policy.
      </p>
      <p className="font-poppins text-sm md:text-base ">
        ©2023 Web3Bridge Africa. All rights reserved
      </p>
    </div>
  );
}
