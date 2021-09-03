import React, { useState, FunctionComponent } from 'react';
import { CYOA } from './CYOA';
import { Draft } from './Draft';
import { GameOver } from './GameOver';
import { TechTree } from './TechTree';


export const GameWrapper: FunctionComponent = () => {



    return (
        <div>
        <CYOA />
        <Draft />
        <TechTree />
        </div>
    )
}
