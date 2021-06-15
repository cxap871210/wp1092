import constants from '../constants';  
// Look at this file and see how the watchList is strucutred
import {GET_COUNT_QUERY} from "../graphql/query"
import { useQuery, useMutation } from '@apollo/react-hooks';

export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
    const { loading, error, data, subscribeToMore } = useQuery(GET_COUNT_QUERY);
 
    const counts = null;

    // TODO
    // use subscription
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}