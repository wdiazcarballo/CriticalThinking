import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

const GibbsReflectiveCycleDashboard = () => {
  // State for user selections
  const [thinkingStyle, setThinkingStyle] = useState('');
  const [enneagramType, setEnneagramType] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('description');
  const [profileScores, setProfileScores] = useState(null);
  
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
  
  // Gibbs reflective cycle phases
  const phases = [
    { id: 'description', name: 'Description', color: '#e0f7fa', question: 'What happened?' },
    { id: 'feelings', name: 'Feelings', color: '#e8f5e9', question: 'What were you thinking and feeling?' },
    { id: 'evaluation', name: 'Evaluation', color: '#fff3e0', question: 'What was good and bad about the experience?' },
    { id: 'analysis', name: 'Analysis', color: '#e1f5fe', question: 'What sense can you make of the situation?' },
    { id: 'conclusion', name: 'Conclusion', color: '#f3e5f5', question: 'What else could you have done?' },
    { id: 'action', name: 'Action Plan', color: '#ffebee', question: 'What would you do next time?' }
  ];
  
  // Strengths and blind spots data based on thinking styles for each phase
  const thinkingStyleData = {
    description: {
      strengths: { styles: ['Expert', 'Connector'], enneagrams: ['1', '2', '5', '6'] },
      blindSpots: { styles: ['Explorer', 'Energizer'], enneagrams: ['4', '7', '8', '9'] }
    },
    feelings: {
      strengths: { styles: ['Connector', 'Coach'], enneagrams: ['2', '4', '6', '9'] },
      blindSpots: { styles: ['Expert', 'Producer'], enneagrams: ['1', '3', '5', '8'] }
    },
    evaluation: {
      strengths: { styles: ['Energizer', 'Optimizer'], enneagrams: ['1', '3', '7', '8'] },
      blindSpots: { styles: ['Connector', 'Coach'], enneagrams: ['2', '4', '6', '9'] }
    },
    analysis: {
      strengths: { styles: ['Expert', 'Planner'], enneagrams: ['1', '4', '5', '6'] },
      blindSpots: { styles: ['Energizer', 'Producer'], enneagrams: ['3', '7', '8', '9'] }
    },
    conclusion: {
      strengths: { styles: ['Explorer', 'Coach'], enneagrams: ['2', '4', '7', '9'] },
      blindSpots: { styles: ['Optimizer', 'Expert'], enneagrams: ['1', '3', '5', '8'] }
    },
    action: {
      strengths: { styles: ['Producer', 'Planner'], enneagrams: ['1', '3', '6', '8'] },
      blindSpots: { styles: ['Explorer', 'Coach'], enneagrams: ['4', '5', '7', '9'] }
    }
  };

  // Calculate profile scores whenever thinking style or enneagram changes
  useEffect(() => {
    if (thinkingStyle && enneagramType) {
      const scores = {};
      
      // Calculate score for each phase
      phases.forEach(phase => {
        const thinkingStyleIsStrength = thinkingStyleData[phase.id].strengths.styles.includes(thinkingStyle);
        const thinkingStyleIsBlindSpot = thinkingStyleData[phase.id].blindSpots.styles.includes(thinkingStyle);
        
        const enneagramIsStrength = thinkingStyleData[phase.id].strengths.enneagrams.includes(enneagramType);
        const enneagramIsBlindSpot = thinkingStyleData[phase.id].blindSpots.enneagrams.includes(enneagramType);
        
        // Calculate score: base score of 50, +25 for each strength, -25 for each blind spot
        let score = 50;
        if (thinkingStyleIsStrength) score += 25;
        if (thinkingStyleIsBlindSpot) score -= 25;
        if (enneagramIsStrength) score += 25;
        if (enneagramIsBlindSpot) score -= 25;
        
        // Ensure score stays between 0 and 100
        score = Math.max(0, Math.min(100, score));
        
        scores[phase.id] = score;
      });
      
      setProfileScores(scores);
    } else {
      setProfileScores(null);
    }
  }, [thinkingStyle, enneagramType]);
  
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
        content: `This phase of reflection comes naturally to you. Use your abilities in the ${selectedPhase} phase to help others and develop deeper insights.`,
        tips: [
          'Share your approach with others who might struggle',
          'Challenge yourself to go even deeper in this phase',
          'Be mindful not to rush through this phase'
        ]
      };
    }
    
    // If both are blind spots
    if (thinkingStyleMatch === 'blindSpot' && enneagramMatch === 'blindSpot') {
      return {
        title: 'Your Challenge Area',
        content: `The ${selectedPhase} phase may be particularly challenging for you. Consider developing specific strategies to strengthen this area.`,
        tips: [
          'Use structured prompts or templates',
          'Set aside dedicated time for this phase',
          'Partner with someone who has complementary strengths',
          'Use journaling or guided questions to deepen engagement'
        ]
      };
    }
    
    // If mixed
    return {
      title: 'Mixed Influence',
      content: `You have some natural tendencies that both support and challenge your engagement with the ${selectedPhase} phase.`,
      tips: [
        'Leverage your strengths to overcome your blind spots',
        'Be aware of when you might be avoiding aspects of this phase',
        'Develop specific strategies for the aspects you find challenging'
      ]
    };
  };
  
  // Get phase-specific strategies based on thinking style and enneagram type
  const getPhaseStrategies = () => {
    if (!selectedPhase || !thinkingStyle || !enneagramType) return null;
    
    const strategies = {
      description: {
        Explorer: 'Use creative documentation methods like mind maps or visual journals',
        Expert: 'Create detailed and structured documentation templates',
        Energizer: 'Record immediate impressions right after experiences',
        Producer: 'Focus on key factual elements and concrete details',
        Planner: 'Use systematic documentation approaches with clear categories',
        Optimizer: 'Develop efficient methods to capture essential information',
        Connector: 'Consider multiple perspectives in your descriptions',
        Coach: 'Practice non-judgmental observation and documentation'
      },
      feelings: {
        Explorer: 'Use creative expression to explore emotional responses',
        Expert: 'Develop emotional vocabulary to articulate feelings precisely',
        Energizer: 'Connect emotions to their energetic impact on you and others',
        Producer: 'Schedule dedicated time for emotional processing',
        Planner: 'Create a feelings log with patterns and triggers',
        Optimizer: 'Identify emotional patterns that help or hinder growth',
        Connector: 'Explore how your feelings relate to others involved',
        Coach: 'Practice self-compassion when examining difficult emotions'
      },
      evaluation: {
        Explorer: 'Consider unconventional evaluation criteria',
        Expert: 'Develop objective evaluation frameworks',
        Energizer: 'Focus on impacts and outcomes of the experience',
        Producer: 'Evaluate based on effectiveness and efficiency',
        Planner: 'Assess against predetermined goals and expectations',
        Optimizer: 'Identify specific elements for improvement',
        Connector: "Consider the experience from others' perspectives",
        Coach: 'Balance constructive criticism with appreciation'
      },
      analysis: {
        Explorer: 'Look for unexpected connections and patterns',
        Expert: 'Apply relevant theories and frameworks',
        Energizer: 'Focus on dynamics and energy flows in the situation',
        Producer: 'Analyze for actionable insights',
        Planner: 'Map out cause-effect relationships systematically',
        Optimizer: 'Identify leverage points for maximum improvement',
        Connector: 'Analyze relationship patterns and interpersonal dynamics',
        Coach: 'Look for growth opportunities and learning moments'
      },
      conclusion: {
        Explorer: 'Generate multiple alternative approaches',
        Expert: 'Research best practices and expert recommendations',
        Energizer: 'Focus on options that create positive momentum',
        Producer: 'Identify the most efficient and effective alternatives',
        Planner: 'Develop systematic decision frameworks',
        Optimizer: 'Refine existing approaches rather than starting over',
        Connector: 'Consider how alternative approaches impact relationships',
        Coach: 'Focus on growth-oriented conclusions'
      },
      action: {
        Explorer: 'Create flexible, adaptable action plans',
        Expert: 'Develop detailed, research-backed approaches',
        Energizer: 'Focus on motivating first steps and building momentum',
        Producer: 'Create concrete, measurable action items',
        Planner: 'Develop comprehensive implementation timelines',
        Optimizer: 'Streamline actions for maximum efficiency',
        Connector: 'Include collaborative elements in your action plan',
        Coach: 'Build in reflection points and learning opportunities'
      }
    };
    
    return strategies[selectedPhase][thinkingStyle];
  };
  
  // Specific tips for each Enneagram type in each phase
  const getEnneagramTips = () => {
    if (!selectedPhase || !enneagramType) return null;
    
    const tips = {
      description: {
        '1': 'Be careful not to filter observations through right/wrong judgments',
        '2': "Include your own needs and experiences, not just others'",
        '3': 'Focus on the experience itself rather than how it appears to others',
        '4': 'Balance unique aspects with common patterns in your description',
        '5': 'Include emotional and interpersonal details, not just facts',
        '6': 'Notice when anxiety might be coloring your description',
        '7': 'Pay attention to uncomfortable aspects you might gloss over',
        '8': 'Include vulnerable details you might typically minimize',
        '9': 'Note conflicts or problems rather than minimizing them'
      },
      feelings: {
        '1': 'Acknowledge anger and resentment you might typically suppress',
        '2': 'Explore your authentic feelings, not what you think you should feel',
        '3': 'Connect with emotions beyond success/failure',
        '4': 'Balance emotional intensity with objective reflection',
        '5': 'Stay with feelings rather than intellectualizing them',
        '6': 'Distinguish between anxiety-based and experience-based feelings',
        '7': 'Explore difficult emotions you might avoid',
        '8': 'Acknowledge vulnerability and softer emotions',
        '9': 'Identify your own feelings distinct from others involved'
      },
      evaluation: {
        '1': 'Balance critical assessment with acknowledgment of what worked',
        '2': "Evaluate based on your own values, not just others' needs",
        '3': 'Consider depth of experience beyond visible success',
        '4': 'Balance emotional significance with practical outcomes',
        '5': 'Include interpersonal and emotional aspects in evaluation',
        '6': 'Notice when worst-case thinking affects your evaluation',
        '7': 'Give equal attention to challenges and opportunities',
        '8': 'Consider subtle impacts beyond the obvious power dynamics',
        '9': 'Be honest about problems rather than harmonizing'
      },
      analysis: {
        '1': 'Consider multiple "right ways" rather than a single ideal',
        '2': "Analyze your own motivations as carefully as others'",
        '3': 'Look beyond efficiency and image to deeper patterns',
        '4': 'Balance personal meaning with universal insights',
        '5': 'Connect theoretical understanding to practical application',
        '6': 'Trust your analysis without excessive double-checking',
        '7': 'Stay with complex problems rather than jumping to solutions',
        '8': 'Consider subtle influences beyond control and power',
        '9': 'Maintain focus on key issues without merging perspectives'
      },
      conclusion: {
        '1': 'Consider flexible approaches, not just "correct" ones',
        '2': 'Include conclusions that prioritize your needs',
        '3': 'Value growth-oriented conclusions beyond achievement',
        '4': 'Balance ideal scenarios with practical alternatives',
        '5': 'Develop conclusions that require engagement, not withdrawal',
        '6': 'Trust your judgment without excessive consultation',
        '7': 'Develop depth in fewer conclusions rather than many options',
        '8': 'Include collaborative alternatives that share control',
        '9': 'Make definitive conclusions rather than ambiguous ones'
      },
      action: {
        '1': 'Build in flexibility rather than rigid perfectionism',
        '2': 'Include self-care actions alongside helping others',
        '3': 'Focus on meaningful process, not just efficient outcomes',
        '4': 'Balance inspirational with practical, actionable steps',
        '5': 'Commit to engagement rather than further research',
        '6': 'Trust your plan without excessive contingencies',
        '7': 'Focus on sustained follow-through for fewer priorities',
        '8': 'Include collaborative actions that share leadership',
        '9': 'Create specific timelines and accountability measures'
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
  
  // Get all thinking styles as flat array
  const allThinkingStyles = Object.values(thinkingStyles).flat();
  
  // Find current phase based on selection
  const currentPhase = phases.find(phase => phase.id === selectedPhase);
  
  const recommendations = getRecommendations();
  const phaseStrategy = getPhaseStrategies();
  const enneagramTip = getEnneagramTips();

  // Prepare data for the Spider/Radar chart
  const prepareRadarData = () => {
    if (!profileScores) return [];
    
    return [
      {
        subject: 'Description',
        A: profileScores.description,
        fullMark: 100,
      },
      {
        subject: 'Feelings',
        A: profileScores.feelings,
        fullMark: 100,
      },
      {
        subject: 'Evaluation',
        A: profileScores.evaluation,
        fullMark: 100,
      },
      {
        subject: 'Analysis',
        A: profileScores.analysis,
        fullMark: 100,
      },
      {
        subject: 'Conclusion',
        A: profileScores.conclusion,
        fullMark: 100,
      },
      {
        subject: 'Action',
        A: profileScores.action,
        fullMark: 100,
      },
    ];
  };
  
  return (
    <div className="flex flex-col p-4 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Gibbs' Reflective Cycle Interactive Dashboard</h1>
      <p className="text-center mb-8">Explore how your thinking style and Enneagram type influence your reflective practice</p>
      
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
      
      {/* Gibbs Cycle Visualization */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Gibbs' Reflective Cycle</h2>
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
                width: '160px',
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
          {/* Spider Graph Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Reflective Strengths & Weaknesses</h2>
            
            {profileScores && (
              <div className="mb-4">
                {/* Spider/Radar Chart */}
                <div className="flex justify-center h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={prepareRadarData()}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Profile"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend Explanation */}
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <h3 className="font-medium mb-2">Strength & Weakness Levels</h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <span className="w-4 h-4 inline-block bg-green-400 mr-2 rounded-full"></span>
                      <span>75-100: Strong natural ability</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 inline-block bg-blue-400 mr-2 rounded-full"></span>
                      <span>50-74: Comfortable competence</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 inline-block bg-yellow-400 mr-2 rounded-full"></span>
                      <span>25-49: Potential challenge area</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 inline-block bg-red-400 mr-2 rounded-full"></span>
                      <span>0-24: Significant blind spot</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
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
        <p>This tool helps identify your natural strengths and potential challenges in each phase of Gibbs' reflective cycle.</p>
        <p className="mt-1">Use these insights to develop a more balanced and effective reflective practice.</p>
      </div>
    </div>
  );
};

export default GibbsReflectiveCycleDashboard;