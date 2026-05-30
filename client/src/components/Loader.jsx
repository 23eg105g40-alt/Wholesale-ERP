import { motion } from "framer-motion";

const Loader = () => {

    return (

        <div className="flex items-center justify-center h-75">

            <motion.div

                animate={{
                    rotate: 360
                }}

                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear"
                }}

                className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full"

            />

        </div>

    );

};

export default Loader;