// Import necessary dependencies
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { DNA } from "react-loader-spinner"

// Define keyframe animation for the hash loader
const hashAnimation = keyframes`
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

// Styled component for the Hash Loader container
const HashLoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Hash Loader component
const Loader = () => {
    return (
        <HashLoaderContainer>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </HashLoaderContainer>
    );
};

// Export the HashLoader component
export default Loader;




