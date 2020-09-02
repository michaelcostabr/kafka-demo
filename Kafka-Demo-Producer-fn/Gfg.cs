// C# program to calculate 
// Distance Between Two 
// Points on Earth 
using System;

public class GFG
{
	static double toRadians(
		double angleIn10thofaDegree)
	{
		// Angle in 10th 
		// of a degree 
		return (angleIn10thofaDegree *
					Math.PI) / 180;
	}
	public static double distance(double lat1,
						double lat2,
						double lon1,
						double lon2)
	{

		// The math module contains 
		// a function named toRadians 
		// which converts from degrees 
		// to radians. 
		lon1 = toRadians(lon1);
		lon2 = toRadians(lon2);
		lat1 = toRadians(lat1);
		lat2 = toRadians(lat2);

		// Haversine formula 
		double dlon = lon2 - lon1;
		double dlat = lat2 - lat1;
		double a = Math.Pow(Math.Sin(dlat / 2), 2) +
				Math.Cos(lat1) * Math.Cos(lat2) *
				Math.Pow(Math.Sin(dlon / 2), 2);

		double c = 2 * Math.Asin(Math.Sqrt(a));

		// Radius of earth in 
		// kilometers. Use 3956 
		// for miles 
		double r = 6371;

		// calculate the result 
		return (c * r);
	}

	//// Driver code 
	//static void Main()
	//{
	//	double lat1 = 53.32055555555556;
	//	double lat2 = 53.31861111111111;
	//	double lon1 = -1.7297222222222221;
	//	double lon2 = -1.6997222222222223;
	//	Console.WriteLine(distance(lat1, lat2,
	//					lon1, lon2) + " K.M");
	//}
}

// This code is contributed by 
// Manish Shaw(manishshaw1) 
