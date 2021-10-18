import axios from 'axios';
import { useRouter } from 'next/router';

function Profile({ user = {} }) {
  const router = useRouter();

  //Caso eu precise usar o fallback (passei um id que não é estático), vou imprimir isso na tela!, mas está indo muito rápido, OK!
  if (router.isFallback) return <h1>carregando...</h1>;

  return (
    <div>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
    { params: { id: context.params.id } }
  );
  const user = await response.data[0];

  return {
    props: { user, revalidate: 10 }, // passasndo como props do meu componente 
  };

  //OBS: Esse meu REVALIDATE de 10segundos significa que vou regenerar a minha página de 10 em 10 segundos
  //Caso a api altere algum nome de usuário, ela só sera afetava aqui graças ao revalidate! 
  //Esse é o conceito de ISG (incremental static regeneration)
}

export async function getStaticPaths() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  const users = await response.data.slice(0, 5); //Mapear somente até o 5 (vai que tenho 10.000 usuarios para carregar), por isso usamos o fallback

  const paths = users.map((user) => {
    return { params: { id: String(user.id) } }; // Informando quais IDs eu posso passar para minha rota 
  });

  return {
    paths,
    fallback: true, // Caso eu receba algum id na URL que não esteja nos meus PARAMS, ele fará uma renderiação com este ID para tentar encontrar a página
  };
}

export default Profile;