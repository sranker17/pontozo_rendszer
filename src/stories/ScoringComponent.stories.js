import React from 'react';
import { ScoringComponent } from '../scoring/ScoringComponent';
import emptyAspectsCriteria from './example-data/empty-aspects.json';
import emptyTasksCriteria from './example-data/empty-tasks.json';
import theExampleCriteria from './example-data/the-example.json';

export default {
  title: 'ScoringComponent',
  component: ScoringComponent,
  argTypes: { 
    onSubmit: {
      action: 'submit' 
    },
    onCancel: { 
      action: 'cancel' 
    },
  },
};

const Template = (args) => <ScoringComponent {...args} />;

export const EmptyTasks = Template.bind({});
EmptyTasks.args = { 
  criteria: emptyTasksCriteria
};

export const EmptyAspects = Template.bind({});
EmptyAspects.args = { 
  criteria: emptyAspectsCriteria
};

export const TheExample = Template.bind({});
TheExample.args = { 
  criteria: theExampleCriteria
};
