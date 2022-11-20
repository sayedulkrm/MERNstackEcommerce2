import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom';




const ProtectedRoute = ({ isAuthenticated, children, isAdmin }) => {


    const { user } = useSelector(state => state.user);
    
    
        if(isAuthenticated === false) {
            return <Navigate to={"/login"} />
        }
        
        if(isAdmin === true && user.role !== "admin") {
            
            return <Navigate to={"/login"} />
            
        }
        
        return children ? children : <Outlet />
    
    
    
    }







// const ProtectedRoute = ({ children, isAdmin }) => {
//     const { isAuthenticated, user } = useSelector(state => state.user);
    
//         if (isAuthenticated === undefined) {
//         return null; // <-- or loading indicator/spinner/etc
//         }
    
//         if (!isAuthenticated || (isAdmin && user.role !== "admin")) {
//         return <Navigate to="/login" replace />;
//         }
        
//         return children ? children : <Outlet />;
// }





export default ProtectedRoute;




// const ProtectedRoute = ({ element: Element, ...rest }) => {


//     const { loading, isAuthenticated, user } = useSelector(state => state.user);



//     return (
//         <Fragment>

//             {!loading && 
            
            
//             (<Routes> 

//                 <Route 
//                     {...rest}
                    
//                     render={(props) => {

//                         if(!isAuthenticated) {
//                             return (<Navigate to="/login" />)
//                         }

//                         return <Element {...props} />
//                     }}


                
                
//                 />
            
//             </Routes>
            
//             )}

//         </Fragment>
//     )
// }




