import { KeyValueAny } from '../types';
import axios from 'axios';
import { getEndpointsForNetwork, Network } from '../../networks';

export const CancelToken = axios.CancelToken;

export const gqlFetcher = async (
         chainEnvironment: Network,
         queryTag: String,
         options: KeyValueAny,
         source = CancelToken.source()
       ) => {
         try {
           const response = await axios.post(
             getEndpointsForNetwork(chainEnvironment).explorerGql,
             {
               query: queryTag,
               variables: options,
             },
             {
               headers: {
                 'Content-Type': 'application/json',
               },
               cancelToken: source.token,
             }
           );
           return response.data.data;
         } catch (e) {
           throw e;
         }
       };

export const restFetcher = async (url: string) =>
  await (await fetch(url)).json();
