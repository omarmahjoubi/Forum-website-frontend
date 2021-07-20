    import React from 'react';
    import ReactDOM from 'react-dom';
    //import './styles/index.css';
    import App from './components/App';
    import reportWebVitals from './reportWebVitals';
    import { persistStore } from 'redux-persist';
    import { Provider } from 'react-redux';
    import { PersistGate } from 'redux-persist/integration/react';
    import store from './store'
    import { BrowserRouter } from 'react-router-dom';

    import {
      ApolloProvider,
      ApolloClient,
      createHttpLink,
      InMemoryCache
    } from '@apollo/client';

    const httpLink = createHttpLink({
      uri: "http://localhost:4000"
    });


    const client = new ApolloClient({
      link: httpLink,
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      },
      cache: new InMemoryCache()
    });

    let persistor = persistStore(store)


    ReactDOM.render(
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
          <App />
          </PersistGate>
          </Provider>
        </ApolloProvider>
      </BrowserRouter>,
      document.getElementById('root')
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
