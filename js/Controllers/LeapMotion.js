
function Leap1()
	{
		//Main Loop
		var controller = Leap.loop(function(frame){
		
		//Detecting if there is a hand present...
		if(frame.hands.length > 0)
		{
			//Insert hands into an array...
			var hand = frame.hands[0];
			var velocity = hand.palmVelocity;
			player.body.velocity.x =   velocity[0] *4 ;
			if(allowFlight)
			player.body.velocity.y =   -velocity[1] *4 ;
		}
		});
	}
	
