// ------------------------------------------------------------------------------
// <auto-generated>
//    Generated by avrogen, version 1.9.0.0
//    Changes to this file may cause incorrect behavior and will be lost if code
//    is regenerated
// </auto-generated>
// ------------------------------------------------------------------------------
namespace Streaming.Pokemon
{
	using System;
	using System.Collections.Generic;
	using System.Text;
	using Avro;
	using Avro.Specific;
	
	public partial class Score : ISpecificRecord
	{
		public static Schema _SCHEMA = Avro.Schema.Parse("{\"type\":\"record\",\"name\":\"Score\",\"namespace\":\"Streaming.Pokemon\",\"fields\":[{\"name\"" +
				":\"ScoredPoints\",\"type\":\"int\"}]}");
		private int _ScoredPoints;
		public virtual Schema Schema
		{
			get
			{
				return Score._SCHEMA;
			}
		}
		public int ScoredPoints
		{
			get
			{
				return this._ScoredPoints;
			}
			set
			{
				this._ScoredPoints = value;
			}
		}
		public virtual object Get(int fieldPos)
		{
			switch (fieldPos)
			{
			case 0: return this.ScoredPoints;
			default: throw new AvroRuntimeException("Bad index " + fieldPos + " in Get()");
			};
		}
		public virtual void Put(int fieldPos, object fieldValue)
		{
			switch (fieldPos)
			{
			case 0: this.ScoredPoints = (System.Int32)fieldValue; break;
			default: throw new AvroRuntimeException("Bad index " + fieldPos + " in Put()");
			};
		}
	}
}
