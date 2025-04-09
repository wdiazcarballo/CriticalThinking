import React, { useState } from 'react';

const OODADecisionCycleDashboard = () => {
  // State for user selections
  const [thinkingStyle, setThinkingStyle] = useState('');
  const [enneagramType, setEnneagramType] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('observe');
  
  // Thinking styles data
  const thinkingStyles = {
    ideas: ['Explorer', 'Expert'],
    process: ['Planner', 'Optimizer'],
    action: ['Energizer', 'Producer'],
    relationships: ['Connector', 'Coach']
  };
  
  // Enneagram types
  const enneagramTypes = [
    { id: '1', name: 'The Perfectionist' },
    { id: '2', name: 'The Helper' },
    { id: '3', name: 'The Achiever' },
    { id: '4', name: 'The Individualist' },
    { id: '5', name: 'The Investigator' },
    { id: '6', name: 'The Loyalist' },
    { id: '7', name: 'The Enthusiast' },
    { id: '8', name: 'The Challenger' },
    { id: '9', name: 'The Peacemaker' }
  ];
  
  // OODA cycle phases
  const phases = [
    { id: 'observe', name: 'Observe', color: '#e0f7fa', question: 'What information are you gathering?' },
    { id: 'orient', name: 'Orient', color: '#e8f5e9', question: 'How are you interpreting this information?' },
    { id: 'decide', name: 'Decide', color: '#fff3e0', question: 'What options will you choose?' },
    { id: 'act', name: 'Act', color: '#e1f5fe', question: 'How will you implement your decision?' }
  ];
  
  // Strengths and blind spots data based on thinking styles for each phase
  const thinkingStyleData = {
    observe: {
      strengths: { styles: ['Expert', 'Connector', 'Explorer'], enneagrams: ['1', '5', '6', '9'] },
      blindSpots: { styles: ['Producer', 'Energizer'], enneagrams: ['3', '7', '8'] }
    },
    orient: {
      strengths: { styles: ['Expert', 'Planner', 'Coach'], enneagrams: ['1', '4', '5', '9'] },
      blindSpots: { styles: ['Energizer', 'Producer'], enneagrams: ['3', '7', '8'] }
    },
    decide: {
      strengths: { styles: ['Optimizer', 'Producer', 'Planner'], enneagrams: ['1', '3', '5', '8'] },
      blindSpots: { styles: ['Explorer', 'Coach'], enneagrams: ['4', '6', '7', '9'] }
    },
    act: {
      strengths: { styles: ['Producer', 'Energizer', 'Optimizer'], enneagrams: ['3', '7', '8'] },
      blindSpots: { styles: ['Expert', 'Explorer'], enneagrams: ['4', '5', '9'] }
    }
  };
  
  // Determine if the selected thinking style is a strength or blind spot for the current phase
  const getThinkingStyleMatch = () => {
    if (!thinkingStyle) return null;
    
    const isStrength = thinkingStyleData[selectedPhase].strengths.styles.includes(thinkingStyle);
    const isBlindSpot = thinkingStyleData[selectedPhase].blindSpots.styles.includes(thinkingStyle);
    
    if (isStrength) return 'strength';
    if (isBlindSpot) return 'blindSpot';
    return 'neutral';
  };
  
  // Determine if the selected enneagram type is a strength or blind spot for the current phase
  const getEnneagramMatch = () => {
    if (!enneagramType) return null;
    
    const isStrength = thinkingStyleData[selectedPhase].strengths.enneagrams.includes(enneagramType);
    const isBlindSpot = thinkingStyleData[selectedPhase].blindSpots.enneagrams.includes(enneagramType);
    
    if (isStrength) return 'strength';
    if (isBlindSpot) return 'blindSpot';
    return 'neutral';
  };
  
  // Get recommendations based on user's profile and current phase
  const getRecommendations = () => {
    const thinkingStyleMatch = getThinkingStyleMatch();
    const enneagramMatch = getEnneagramMatch();
    
    if (!thinkingStyleMatch || !enneagramMatch) return null;
    
    // If both are strengths
    if (thinkingStyleMatch === 'strength' && enneagramMatch === 'strength') {
      return {
        title: 'Your Natural Strength',
        content: `The ${selectedPhase} phase of the OODA cycle comes naturally to you. Use your abilities in this phase to help others and develop deeper decision-making capabilities.`,
        tips: [
          'Share your approach with others who might struggle with this phase',
          'Challenge yourself to use this strength in more complex situations',
          'Be mindful not to rush through this phase due to overconfidence',
          'Mentor others who find this phase challenging'
        ]
      };
    }
    
    // If both are blind spots
    if (thinkingStyleMatch === 'blindSpot' && enneagramMatch === 'blindSpot') {
      return {
        title: 'Your Challenge Area',
        content: `The ${selectedPhase} phase may be particularly challenging for you. Consider developing specific strategies to strengthen this area of your decision-making process.`,
        tips: [
          'Use structured frameworks or checklists for this phase',
          'Allocate more time for this phase in your planning',
          'Partner with someone who has complementary strengths',
          'Develop specific countermeasures for your typical blind spots'
        ]
      };
    }
    
    // If mixed
    return {
      title: 'Mixed Influence',
      content: `You have some natural tendencies that both support and challenge your engagement with the ${selectedPhase} phase of the OODA cycle.`,
      tips: [
        'Leverage your strengths to overcome your blind spots',
        'Be aware of when you might be avoiding aspects of this phase',
        'Develop specific strategies for the aspects you find challenging',
        'Use your contradictory tendencies as a source of balanced perspective'
      ]
    };
  };
  
  // Get phase-specific strategies based on thinking style and enneagram type
  const getPhaseStrategies = () => {
    if (!selectedPhase || !thinkingStyle) return null;
    
    const strategies = {
      observe: {
        Explorer: 'Cast a wide net for diverse information sources and unusual patterns',
        Expert: 'Create systematic observation frameworks to ensure comprehensive data collection',
        Energizer: 'Take quick "information snapshots" at regular intervals to maintain awareness',
        Producer: 'Focus on the most relevant and actionable information',
        Planner: 'Develop structured observation protocols with clear categories',
        Optimizer: 'Create efficient information filtering systems to identify key signals',
        Connector: 'Leverage networks to gather diverse perspectives and insights',
        Coach: 'Practice intentional, present-moment awareness without judgment'
      },
      orient: {
        Explorer: 'Consider multiple interpretive frameworks and unconventional perspectives',
        Expert: 'Apply established analytical frameworks and domain knowledge',
        Energizer: 'Look for patterns that indicate momentum and opportunity',
        Producer: 'Orient toward actionable insights and practical implications',
        Planner: 'Systematically map relationships and dependencies between observations',
        Optimizer: 'Identify leverage points where small changes yield large effects',
        Connector: 'Consider how different stakeholders would interpret the same information',
        Coach: 'Focus on development opportunities and learning implications'
      },
      decide: {
        Explorer: 'Generate multiple creative decision options before choosing',
        Expert: 'Reference historical precedents and established best practices',
        Energizer: 'Make decisions that create momentum and energy',
        Producer: 'Choose options that provide the clearest path to completion',
        Planner: 'Use decision matrices or frameworks to evaluate options systematically',
        Optimizer: 'Select the option that maximizes efficiency and resource utilization',
        Connector: 'Consider decisions that build consensus and strengthen relationships',
        Coach: 'Choose options that provide growth opportunities and long-term development'
      },
      act: {
        Explorer: 'Implement with flexibility, allowing for adaptation and creativity',
        Expert: 'Execute with precision, following established protocols',
        Energizer: 'Act with enthusiasm that motivates others to join the effort',
        Producer: 'Focus on efficient execution and tangible results',
        Planner: 'Implement according to clear sequences and milestones',
        Optimizer: 'Continuously refine implementation for maximum efficiency',
        Connector: 'Execute in ways that strengthen relationships and build trust',
        Coach: 'Implement with opportunities for learning and development'
      }
    };
    
    return strategies[selectedPhase][thinkingStyle];
  };
  
  // Specific tips for each Enneagram type in each phase
  const getEnneagramTips = () => {
    if (!selectedPhase || !enneagramType) return null;
    
    const tips = {
      observe: {
        '1': "Be mindful of filtering observations through perfectionist standards",
        '2': "Notice information beyond others' needs and reactions",
        '3': "Pay attention to details that don't contribute to immediate success",
        '4': "Balance unique perspectives with common patterns",
        '5': "Gather information beyond your comfort zones of expertise",
        '6': "Distinguish between actual threats and perceived dangers",
        '7': "Stay with uncomfortable information rather than seeking positives",
        '8': "Notice subtle details beyond power dynamics and control factors",
        '9': "Maintain focus on conflicts and problems rather than harmonizing"
      },
      orient: {
        '1': "Consider multiple \"right ways\" of interpreting information",
        '2': "Interpret data based on objective criteria, not just relationship impacts",
        '3': "Look beyond image and achievement to deeper patterns",
        '4': "Balance personal significance with objective analysis",
        '5': "Integrate emotional and interpersonal factors into your frameworks",
        '6': "Trust your interpretations without excessive verification",
        '7': "Allow yourself to process negative implications fully",
        '8': "Consider subtle influences beyond control and power dynamics",
        '9': "Maintain your distinct perspective without merging with others' views"
      },
      decide: {
        '1': "Consider \"good enough\" options rather than waiting for the perfect choice",
        '2': "Make decisions that prioritize your own needs when appropriate",
        '3': "Value thoughtful decisions over quick wins",
        '4': "Balance emotionally satisfying choices with practical effectiveness",
        '5': "Make decisions with limited information when necessary",
        '6': "Trust your judgment without excessive consultation",
        '7': "Commit to options with depth rather than breadth",
        '8': "Consider collaborative solutions that share control",
        '9': "Make decisive choices rather than compromising or deferring"
      },
      act: {
        '1': "Allow for flexibility and adjustment during implementation",
        '2': "Balance helping others with self-care during execution",
        '3': "Focus on meaningful process, not just efficient outcomes",
        '4': "Maintain momentum even when inspiration fades",
        '5': "Fully engage rather than intellectualizing during implementation",
        '6': "Act with confidence rather than hedging with excessive fallbacks",
        '7': "Focus on consistent follow-through to completion",
        '8': "Modulate force and control based on situational needs",
        '9': "Maintain clear priorities and boundaries during execution"
      }
    };
    
    return tips[selectedPhase][enneagramType];
  };
  
  // Helper function to determine color class based on match type
  const getMatchColorClass = (matchType) => {
    if (matchType === 'strength') return 'bg-green-100 border-green-500';
    if (matchType === 'blindSpot') return 'bg-red-100 border-red-500';
    return 'bg-gray-100 border-gray-500';
  };
  
  // Find current phase based on selection
  const currentPhase = phases.find(phase => phase.id === selectedPhase);
  
  const recommendations = getRecommendations();
  const phaseStrategy = getPhaseStrategies();
  const enneagramTip = getEnneagramTips();
  
  return (
    <div className="flex flex-col p-4 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">OODA Decision-Making Cycle Dashboard</h1>
      <p className="text-center mb-8">Discover how your thinking style and Enneagram type influence your decision-making process</p>
      
      {/* Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Thinking Style Selection */}
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Select Your Thinking Style</h2>
          
          {/* Ideas Group */}
          <div className="mb-4">
            <h3 className="font-medium text-blue-800 mb-2">IDEAS</h3>
            <div className="flex gap-2 flex-wrap">
              {thinkingStyles.ideas.map(style => (
                <button
                  key={style}
                  onClick={() => setThinkingStyle(style)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    thinkingStyle === style 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          
          {/* Process Group */}
          <div className="mb-4">
            <h3 className="font-medium text-cyan-800 mb-2">PROCESS</h3>
            <div className="flex gap-2 flex-wrap">
              {thinkingStyles.process.map(style => (
                <button
                  key={style}
                  onClick={() => setThinkingStyle(style)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    thinkingStyle === style 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-white text-cyan-600 hover:bg-cyan-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          
          {/* Action Group */}
          <div className="mb-4">
            <h3 className="font-medium text-red-800 mb-2">ACTION</h3>
            <div className="flex gap-2 flex-wrap">
              {thinkingStyles.action.map(style => (
                <button
                  key={style}
                  onClick={() => setThinkingStyle(style)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    thinkingStyle === style 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-red-600 hover:bg-red-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          
          {/* Relationships Group */}
          <div className="mb-4">
            <h3 className="font-medium text-green-800 mb-2">RELATIONSHIPS</h3>
            <div className="flex gap-2 flex-wrap">
              {thinkingStyles.relationships.map(style => (
                <button
                  key={style}
                  onClick={() => setThinkingStyle(style)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    thinkingStyle === style 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white text-green-600 hover:bg-green-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enneagram Type Selection */}
        <div className="bg-purple-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Select Your Enneagram Type</h2>
          <div className="grid grid-cols-1 gap-2">
            {enneagramTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setEnneagramType(type.id)}
                className={`px-3 py-2 rounded-md text-left text-sm font-medium transition-colors ${
                  enneagramType === type.id 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-purple-600 hover:bg-purple-100'
                }`}
              >
                Type {type.id}: {type.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* OODA Cycle Visualization */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">OODA Decision Cycle</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {phases.map(phase => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`px-4 py-3 rounded-lg text-center transition-transform ${
                selectedPhase === phase.id 
                  ? 'transform scale-110 shadow-md font-bold' 
                  : 'hover:scale-105'
              }`}
              style={{ 
                backgroundColor: phase.color,
                width: '180px',
                border: selectedPhase === phase.id ? '2px solid #333' : '1px solid #ddd'
              }}
            >
              <div className="font-medium">{phase.name}</div>
              <div className="text-xs mt-1">{phase.question}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Results Section - only show if both selections are made */}
      {thinkingStyle && enneagramType && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Analysis */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Decision-Making Profile</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Current Phase: <span className="font-bold">{currentPhase.name}</span></h3>
              <p className="text-sm italic mb-3">"{currentPhase.question}"</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Your Thinking Style</h3>
              <div className={`p-3 rounded-md border ${getMatchColorClass(getThinkingStyleMatch())}`}>
                <div className="font-bold">{thinkingStyle}</div>
                <div className="text-sm mt-1">
                  {getThinkingStyleMatch() === 'strength' && 'This is a natural strength for you in this phase!'}
                  {getThinkingStyleMatch() === 'blindSpot' && 'This may be a blind spot for you in this phase.'}
                  {getThinkingStyleMatch() === 'neutral' && 'This has a neutral influence on this phase.'}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Your Enneagram Type</h3>
              <div className={`p-3 rounded-md border ${getMatchColorClass(getEnneagramMatch())}`}>
                <div className="font-bold">Type {enneagramType}: {enneagramTypes.find(t => t.id === enneagramType)?.name}</div>
                <div className="text-sm mt-1">
                  {getEnneagramMatch() === 'strength' && 'This is a natural strength for you in this phase!'}
                  {getEnneagramMatch() === 'blindSpot' && 'This may be a blind spot for you in this phase.'}
                  {getEnneagramMatch() === 'neutral' && 'This has a neutral influence on this phase.'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            
            {recommendations && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">{recommendations.title}</h3>
                <p className="text-sm mb-3">{recommendations.content}</p>
                
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <h4 className="font-medium mb-2">Strategies:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {recommendations.tips.map((tip, index) => (
                      <li key={index} className="mb-1">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Specific Tips */}
            <div className="grid grid-cols-1 gap-4 mt-6">
              {phaseStrategy && (
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                  <h3 className="font-medium mb-1">Thinking Style Strategy</h3>
                  <p className="text-sm">{phaseStrategy}</p>
                </div>
              )}
              
              {enneagramTip && (
                <div className="bg-purple-50 p-3 rounded-md border border-purple-200">
                  <h3 className="font-medium mb-1">Enneagram-Specific Tip</h3>
                  <p className="text-sm">{enneagramTip}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* No selections yet message */}
      {(!thinkingStyle || !enneagramType) && (
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow mt-4">
          <h3 className="font-medium text-lg mb-2">Complete Your Profile</h3>
          <p className="text-gray-600">
            {!thinkingStyle && !enneagramType && "Select your thinking style and Enneagram type to see personalized recommendations."}
            {thinkingStyle && !enneagramType && "Now select your Enneagram type to complete your profile."}
            {!thinkingStyle && enneagramType && "Now select your thinking style to complete your profile."}
          </p>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This tool helps identify your natural strengths and potential challenges in each phase of the OODA decision cycle.</p>
        <p className="mt-1">Use these insights to enhance your critical thinking and strengthen your decision-making process.</p>
        <p className="mt-3">For Computer Science and Digital Technology & Innovation students</p>
      </div>
    </div>
  );
};

export default OODADecisionCycleDashboard;