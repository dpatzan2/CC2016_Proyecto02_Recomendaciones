import { useRouter } from 'next/navigation';


export default function HomePage (){

    const router = useRouter();
    const handleSignInRedirect = () => {
        router.push('/auth/singin');
    };

    return (
        <>
            <section>
                <title>Recomendaciones de Películas</title>
            </section>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Bienvenido a MovieMate</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Tu portal de recomendaciones personalizadas de películas
                    </p>
                </div>
                <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Explora y Descubre
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                             utiliza algoritmos avanzados para recomendarte las mejores películas según tus gustos. 
                            ¡Únete a nuestra comunidad y descubre nuevas joyas cinematográficas!
                        </p>
                        <button 
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSignInRedirect}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="mt-8 w-full max-w-2xl text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¿Qué ofrecemos?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recomendaciones Personalizadas</h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Recibe sugerencias de películas basadas en tus preferencias y calificaciones anteriores.
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Listas de Películas</h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Crea y comparte tus propias listas de películas favoritas con otros usuarios.
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Reseñas y Comentarios</h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Lee reseñas y comentarios de otros cinéfilos y comparte tu opinión sobre las películas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}